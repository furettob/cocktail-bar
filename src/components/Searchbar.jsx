import * as React from "react"
import { Fragment, useState } from "react"

function Searchbar({ label, placeholder, cta, onClickCallback }) {
  const onSubmit = e => {
    onClickCallback(e.target.searchStr.value)
    e.preventDefault()
  }

  return (
    <Fragment>
      <form className={"cb-searchbar"} onSubmit={onSubmit} role="search">
        {label && (
          <label className={"cb-searchbar__label"} htmlFor="search">
            {label}
          </label>
        )}
        <input
          className={"cb-searchbar__input"}
          id="search"
          name="searchStr"
          type="search"
          placeholder={placeholder || "Search..."}
          autoFocus
          required
        />
        <button className={"cb-searchbar__button"} type="submit">
          {cta || "Go"}
        </button>
      </form>
    </Fragment>
  )
}

export default Searchbar
