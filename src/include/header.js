import { Button } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
//useHistory : Link처럼 다른 경로로 이동시켜줌

const Header = () => {
    const history = useHistory();
    return (
        <header className="inner">
            <div>
                <h1>
                    <Link to={'/'}><img src="/images/icons/logo.png" alt="그랩마켓" /></Link>
                </h1>
            </div>
            <Button size="large" onClick={() => {
                //다른 경로로 이동
                history.push('/upload');
            }} icon={<DownloadOutlined />}>
                상품 업로드
            </Button>
        </header>
    )
}

export default Header;
