// npm
import Link from "next/link"

// self
import sitepaths from "../sitepaths.json"

const pages = sitepaths.map(({page}) => page)

const CustomPages = () => (
  <div>
    <h3>List of Custom Pages</h3>
    <ul>
      {pages &&
        pages.length > 0 &&
        pages.map((page) => (
          <li key={page}>
            <Link href={`/custom/${page}`}>
              <a>{page}</a>
            </Link>
          </li>
        ))}
    </ul>
  </div>
)

CustomPages.displayName = "custom-pages-component"
CustomPages.tournemain = { description: "Lists all available custom pages." }

export default CustomPages
