import { Fragment } from 'react';

const EditAddress = ({ addressBook, handleAddressChange }) => {
  const list = addressBook.map(address => {
    return (
      <Fragment key={address.id}>
        <label htmlFor={address.id}>{address.name} : </label>
        <input
          type='text'
          name={address.name}
          id={address.id}
          value={address.value}
          onChange={handleAddressChange}
        />
        <br />
      </Fragment>
    );
  });

  return list;
};

export default EditAddress;
