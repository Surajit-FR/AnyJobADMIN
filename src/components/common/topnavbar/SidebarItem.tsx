import { Link } from "react-router-dom";
import { MenuItems } from "../../../../types/common";

interface SidebarItemProps {
    item: MenuItems;
    level: number;
}

// Map level numbers to class names
const levelClassNames: { [key: number]: string } = {
    0: 'first-level',
    1: 'second-level',
    2: 'third-level',
    3: 'fourth-level',
};

const SidebarItem = ({ item, level }: SidebarItemProps) => {
    const trimmedTitle = item?.title?.replace(/\s+/g, '');
    const className = `side-nav-${levelClassNames[level] || 'second-level'}`;

    // Calculate padding based on level
    const paddingLeft = `${level * 4}px`;

    return (
        <li className="side-nav-item">
            {item?.isSubmenu ? (
                <>
                    <Link
                        data-bs-toggle="collapse"
                        to={`#sidebar${trimmedTitle}`}
                        aria-expanded="false"
                        aria-controls={`sidebar${trimmedTitle}`}
                        className="side-nav-link"
                    >
                        <i className={item?.icon}></i>
                        <span>{item?.title}</span>
                        <span className="menu-arrow"></span>
                    </Link>
                    <div className="collapse" id={`sidebar${trimmedTitle}`}>
                        <ul className={className} style={{ paddingLeft }}>
                            {item?.items?.map((subItem, subIndex) => (
                                <SidebarItem
                                    key={subIndex}
                                    item={subItem}
                                    level={level + 1}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <Link to={item?.to || "/dashboard"} className="side-nav-link">
                    <i className={item?.icon}></i>
                    <span>{item?.label}</span>
                </Link>
            )}
        </li>
    );
};

export default SidebarItem;