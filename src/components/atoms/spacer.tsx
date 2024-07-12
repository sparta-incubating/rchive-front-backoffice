interface SpacerProps {
  className?: string;
}

const Spacer = ({ className }: SpacerProps) => {
  return <div className={className}></div>;
};

export default Spacer;
