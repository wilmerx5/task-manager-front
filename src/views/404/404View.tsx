import { Link } from "react-router-dom"

function View404() {
  return (
    <>
      <h1 className="font-black text-center text-4xl  text-white"> Page not found</h1>
      <p className="text-white mt-10">
        back {" "}
        <Link  className="text-fuchsia-500" to={'/'}>
          Home
        </Link>
      </p>
    </>
  )
}

export default View404