import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  // When our component is mounted, it causes the componentDidUpdate lifecycle method to trigger
  //Once our component is mounted on the screen, our componentDidMount if displayed, the localStorage functionality is evaluated immediately, but it is impossible for our order to be displayed on the screen without our fish being available. Ensure to check that the fiah os available in the order component and return null is not availble.
  componentDidMount() {
    const { params } = this.props.match;
    //first reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  // Since we are trying to set our order to use local localStorage
  // 1. We implement that using the componentDidUpdate lifecyce method
  // 2. Since our order could vary based on the store ID, we sest to our localStorage.setItem two parameters (the storeId gotten fromthis.props.match.params.storeId and the order state we are trying to add to local storage )

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  //For cleaning any future memory issue
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Make a copy of the exisiting state
    const fishes = { ...this.state.fishes };
    // Add our new fish to that fishes
    fishes[`fish${Date.now()}`] = fish;
    // Updating state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    //Take a copy of the current state
    const fishes = { ...this.state.fishes };
    //update that state
    fishes[key] = updatedFish;
    //set to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    //1. Take a copy of state
    const fishes = { ...this.state.fishes };
    //2.update the state(delete the fish)
    fishes[key] = null;
    //3. update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };

    // 2. Either add to the order, or update the number of counts in our order
    // if the order exist add 1 to our order count, if it doesnt exist add that clicked order to our "Order"component displayed on the screen

    // [key] refers to the key passed in (i.e key which means fish)
    order[key] = order[key] + 1 || 1;

    // 3. Call setState to update our state object
    this.setState({ order });
  };
  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    //remove item from order
    delete order[key];
    //3. Call setState to update our state object
    this.setState({ order });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Something" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
