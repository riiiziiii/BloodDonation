export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  export const getStatusColor = (status) => {
    switch (status) {
      case DonationRequestStatus.PENDING:
        return 'orange';
      case DonationRequestStatus.ACCEPTED:
        return 'green';
      default:
        return 'gray';
    }
  };
  
  export const validatePhoneNumber = (phone) => {
    return /^[0-9]{11}$/.test(phone);
  };