const BtcVideo = () => {
  return (
    <video
      controls={false}
      width="100%"
      height="auto"
      autoPlay={true}
      muted
      loop={true}
    >
      <source src="/assets/img/btcCoin2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BtcVideo;
