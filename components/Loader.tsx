type Props = {
  show: boolean;
};

const Loader = ({ show }: Props) => {
  return show ? <div className="loader"></div> : null;
};

export default Loader;
