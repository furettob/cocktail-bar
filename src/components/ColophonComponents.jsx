import * as React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import UserCard from './UserCard'
import Row from './Row'

function ColophonComponents() {

    const authors = [
        {
            name: "Marco",
            lastname: "Corradetti",
            jobPosition: "Frontend developer",
            company: "Docsity",
            avatarUrl: "/img/marco_avatar.png",
            role: "Author",
            links: [
                {name: "Github", logo: "fa fa-github", url:"https://github.com/corradetti-s"},
                {name: "Linkedin", logo: "fa fa-linkedin", url:"https://www.linkedin.com/in/sspensieri/"},
                {name: "Docsity", logo: "fa fa-globe", url:"https://www.docsity.com"},
            ]
        },
        {
            name: "Stefano",
            lastname: "Spensieri",
            jobPosition: "Frontend developer",
            company: "Docsity",
            avatarUrl: "/img/stefano_avatar.jpeg",
            role: "Author",
            links: [
                {name: "Github", logo: "fa fa-github", url:"https://github.com/spensieri-s"},
                {name: "Linkedin", logo: "fa fa-linkedin", url:"https://www.linkedin.com/in/sspensieri/"},
                {name: "Docsity", logo: "fa fa-globe", url:"https://www.docsity.com"},
            ]
        },
        {
            name: "Computer Science Students",
            lastname: null,
            company: "Corso Interazione Uomo Macchina e Tecnologie Web",
            avatarUrl: "/img/unito.png",
            jobPosition: "Computer Science Students",
            role: "Editors",
            links: [
                {name: "Università di Torino", logo: "fa fa-university", url:"https://www.unito.it/"}
            ]
        },
    ]

    return (
      <div className={"cb-colophon"}>
          <Row>
              <p className={"cb-copy cb-copy--muted"}>
                  Little web app made and updated with <i className={"fa fa-heart"}/> from:
              </p>
              {authors.map((author, index) =>
                  <UserCard user={author} key={author?.name || index}/>
              )}
          </Row>
      </div>
    )
}

export default ColophonComponents