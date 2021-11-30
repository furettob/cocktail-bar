import * as React from "react";
import { Fragment } from "react";
import "font-awesome/css/font-awesome.min.css";

function UserCard({ user }) {
  return (
    <div className={"cb-uc"}>
      <div>
        <img className={"cb-uc__image"} src={user.avatarUrl} />
      </div>
      <div className={"cb-uc__text"}>
        <div className={"cb-uc__role"}>{user.role}</div>
        <div className={"cb-uc__name"}>
          {user.name} {user.lastname}
        </div>
        <div className={"cb-uc__jp"}>
          {user.jobPosition} from {user.company}
        </div>
        <div className={"cb-uc__links"}>
          {user.links.map((link, index) => (
            <a href={link.url} className="cb-uc__link">
              {link.logo && (
                <span className={"cb-uc__link-logo"}>
                  <i className={link.logo} />
                </span>
              )}
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* ESE-7 Create a media object to abstract the behaviour of this component and IngredientDetailed */
}

export default UserCard;
