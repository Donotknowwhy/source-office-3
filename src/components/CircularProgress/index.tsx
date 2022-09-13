import React from 'react';

class CircularProgress extends React.Component<{ className?: string }> {
  render() {
    const { className } = this.props;
    return (
      <div className={`loader ${className}`}>
        <img src="/assets/images/loading.svg" alt="loader" />
      </div>
    );
  }
}
export default CircularProgress;
