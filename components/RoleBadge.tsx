import React from "react";

interface User {
  role: "ADMINISTRATOR" | "BLOGGER" | "MEMBER";
}

interface BadgeProps {
  user: User;
}

const RoleBadge: React.FC<BadgeProps> = ({ user }) => {
  const badgeStyles = {
    ADMINISTRATOR: "bg-red-500 text-white w-fit text-xs",
    BLOGGER: "bg-blue-500 text-white w-fit text-xs",
    MEMBER: "bg-green-500 text-white w-fit text-xs",
  };

  return (
    <div
      className={`capitalize px-2 py-1 rounded-full text-sm font-semibold ${
        badgeStyles[user.role]
      }`}
    >
      {user.role.toLowerCase()}
    </div>
  );
};

export default RoleBadge;
