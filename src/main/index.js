import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { API_URL } from '../config/constants';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        axios.get(`${API_URL}/products/`)
            .then(function (result) {
                const products = result.data.product;
                console.log(products);
                setProducts(products);
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(`${API_URL}/banners`)
            .then((result) => {
                const banners = result.data.banners;
                setBanners(banners);
            }).catch((error) => {
                console.error("에러발생!", error);
            })
    }, []);
    return (
        <div>

            <section>
                <Carousel autoplay={true} autoplaySpeed={3000}>
                    {banners.map((banner, index) => {
                        return (
                            <Link to={banner.href}>
                                <div id="visual">
                                    <img src={`${API_URL}/${banner.imageUrl}`} alt="배너이미지" />
                                </div>
                            </Link>
                        )
                    })}
                </Carousel>
                <div id="products" className="inner">
                    <h2>최신상품</h2>
                    <div id="product-list">
                        {
                            products.map((product, index) => {
                                return (
                                    <div className="product-card" key={product.id}>
                                        <Link to={`/product/${product.id}`}>
                                            <div>
                                                <img src={product.imageUrl} alt="상품이미지" class="product-img" />
                                            </div>
                                            <div className="product-contents">
                                                <span className="product-name">{product.name}</span>
                                                <span className="product-price">{product.price}</span>
                                                <div className="product-seller">
                                                    <img src="images/icons/avatar.png" alt="아이콘" class="product-avatar" />
                                                    <span>{product.seller}</span>
                                                </div>
                                                <div>{moment(product.createdAt).format('YYYY-MM-DD')}</div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>

        </div>
    )
}

export default MainPage;