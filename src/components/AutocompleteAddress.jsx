import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import locationIcon from '../img/icons8-marker-50.png'


class AutocompleteAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        address: "",
        addressTyp: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

  }


  // STORE THE INPUT 
  handleChange = address => {
    const copydata = { ...this.state.data }
    copydata.address = address
    this.setState({
      data: copydata
    })
  }


  //STORE THE SELECTED ADDRESS TO STATE AND PASS IT UP 

  handleSelect = address => {
    const copydata = { ...this.state.data }
    copydata.address = address
    if (this.props.addressTyp) {
      copydata.addressTyp = this.props.addressTyp
    }

    this.setState(
      { data: copydata }, () => {
        this.props.passAddress(this.state.data);

      }
    );

  }




  render() {
    return (
      <PlacesAutocomplete
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        value={this.state.data.address}
        ref={this.props.ref}

      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="cont">

            <input value={this.props.empty}   {...getInputProps({
              placeholder: "PLEASE ENTER" + this.props.addressType + "ADDRESS",
              className: 'location-search-input',

            })} />
            <div className="autocomplete-dropdown-container" >
              {loading && <div style={{ background: '#fff' }}>LOADING POSSIBLE ADDRESSES...</div>}
              {
                suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                    >
                      <span><img style={{ height: '15px', width: '13px' }} src={locationIcon} />{suggestion.description}</span>
                    </div>
                  );
                })}

            </div>
          </div>
        )}

      </PlacesAutocomplete>

    )
  }
}


export default AutocompleteAddress;
