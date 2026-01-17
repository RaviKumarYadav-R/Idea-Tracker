import React from "react";

const Textarea = React.forwardRef(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="">
        {label && <label className="block mb-1 font-medium text-slate-100">{label}</label>}
        <textarea className={className} {...props} ref={ref} />
      </div>
    );
  }
);

export default Textarea;
