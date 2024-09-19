import { Link } from "react-router-dom";

const SearchBar = (): JSX.Element => {
    return (
        <>
            <li className="dropdown d-lg-none">
                <Link className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" to="#" role="button"
                    aria-haspopup="false" aria-expanded="false">
                    <i className="ri-search-line fs-22"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">
                    <form className="p-3">
                        <input type="search" className="form-control" placeholder="Search ..."
                            aria-label="Recipient's username" />
                    </form>
                </div>
            </li>
        </>
    );
};

export default SearchBar;