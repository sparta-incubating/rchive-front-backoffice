const d = cva('h-5 w-5 bg-center bg-no-repeat', {
  variants: {
    variant: {
      all: "data-[checked=true]:bg-[url('/assets/icons/Checkbox.svg')] bg-[url('/assets/icons/unCheckbox.svg')]",
      checked:
        "data-[checked=true]:bg-[url('/assets/icons/Checked.svg')] bg-[url('/assets/icons/unCheck.svg')]",
    },
  },
  defaultVariants: {
    variant: 'checked',
  },
});

const ProfileContainer = () => {
  return <div></div>;
};

export default ProfileContainer;
