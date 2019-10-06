// npm
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"

// self
import sitepaths from "../sitepaths.json"

const Backlinks = ({ of }) => {
  /*
  const {
    query: { page },
  } = useRouter()
  */

  const rr = useRouter()
  console.log('RR', rr)
  let [niet, custom, page] = rr.route.split('/')
  if (custom !== 'custom') page = false

  // const [backlinks, setBacklinks] = useState()

  /*
  useEffect(() => {
    fetch(`/api/backlinks/${of || page}`).then(async (res) => {
      if (!res.ok) return setBacklinks([])
      const j = await res.json()
      setBacklinks(j)
    })
  }, [])
  */

  const backlinks = sitepaths.find((el) => el.page === (of || page)).backlinks

  console.log('backlinks:', backlinks)

  return (
    <div>
      <h3>Pages linking {of ? `to ${of}` : "here"}</h3>
      <ul>
        {backlinks.map((b) => (
          <li key={b.page}>
            <Link href={`/custom/${b.page}`}>
              <a>{b.page}</a>
            </Link>{" "}
            with text <b>{b.text}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

Backlinks.propTypes = {
  of: PropTypes.string,
}

Backlinks.tournemain = {
  description: "Lists pages linking back to the current page.",
}

export default Backlinks
