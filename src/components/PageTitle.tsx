import { Link } from "react-router-dom";

type BreadcrumbItem = {
    label: string;
    link?: string;
};

interface PageTitleProps {
    pageName: string;
    breadcrumbs: Array<BreadcrumbItem>;
}

const PageTitle = ({ pageName, breadcrumbs }: PageTitleProps): JSX.Element => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box justify-content-between d-flex align-items-md-center flex-md-row flex-column">
                        <h4 className="page-title">{pageName}</h4>
                        <ol className="breadcrumb m-0">
                            {breadcrumbs.map((breadcrumb, index) => (
                                <li
                                    key={index}
                                    className={`breadcrumb-item${index === breadcrumbs.length - 1 ? ' active' : ''}`}
                                >
                                    {breadcrumb.link ? (
                                        <Link to={breadcrumb.link}>{breadcrumb.label}</Link>
                                    ) : (
                                        breadcrumb.label
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageTitle;