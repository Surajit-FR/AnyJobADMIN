import { Link } from "react-router-dom";

const TopSellingProducts = (): JSX.Element => {
    return (
        <>
            <div className="col-xl-5">
                <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                        <h4 className="header-title">Top Selling Products</h4>
                        <Link to="#" className="btn btn-sm btn-info">Export <i
                            className="ri-download-line ms-1"></i></Link>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table
                                className="table table-borderless table-hover table-nowrap table-centered m-0">
                                <thead className="border-top border-bottom bg-light-subtle border-light">
                                    <tr>
                                        <th className="py-1">Product</th>
                                        <th className="py-1">Price</th>
                                        <th className="py-1">Orders</th>
                                        <th className="py-1">Avl. Quantity</th>
                                        <th className="py-1">Seller</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ASOS Ridley High Waist</td>
                                        <td>$79.49</td>
                                        <td>82</td>
                                        <td>8,540</td>
                                        <td>Adidas</td>
                                    </tr>
                                    <tr>
                                        <td>Marco Lightweight Shirt</td>
                                        <td>$12.5</td>
                                        <td>58</td>
                                        <td>6,320</td>
                                        <td>Puma</td>
                                    </tr>
                                    <tr>
                                        <td>Half Sleeve Shirt</td>
                                        <td>$9.99</td>
                                        <td>254</td>
                                        <td>10,258</td>
                                        <td>Nike</td>
                                    </tr>
                                    <tr>
                                        <td>Lightweight Jacket</td>
                                        <td>$69.99</td>
                                        <td>560</td>
                                        <td>1,020</td>
                                        <td>Puma</td>
                                    </tr>
                                    <tr>
                                        <td>Marco Sport Shoes</td>
                                        <td>$119.99</td>
                                        <td>75</td>
                                        <td>357</td>
                                        <td>Adidas</td>
                                    </tr>
                                    <tr>
                                        <td>Custom Women's T-shirts</td>
                                        <td>$45.00</td>
                                        <td>85</td>
                                        <td>135</td>
                                        <td>Branded</td>
                                    </tr>
                                    <tr>
                                        <td>Marco Sport Shoes</td>
                                        <td>$119.99</td>
                                        <td>75</td>
                                        <td>357</td>
                                        <td>Adidas</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center">
                            <Link to="#!"
                                className="text-primary text-decoration-underline fw-bold btn mb-2">View All</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopSellingProducts;