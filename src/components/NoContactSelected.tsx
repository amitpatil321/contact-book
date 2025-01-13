const NoContactSelected = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-full">
      <img
        src="/contact-book-icon.png"
        alt="no contact selected"
        className="h-40"
      />
      <h5 className="font-semibold text-gray-400 text-xl">
        No contact selected
      </h5>
    </div>
  );
};

export default NoContactSelected;
