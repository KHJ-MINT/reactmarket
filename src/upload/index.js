import React, { useState } from 'react';
import { Form, Button, Input, Upload } from 'antd';
import './index.scss';
import { API_URL } from '../config/constants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const UploadPage = () => {
    const history = useHistory();
    const onSubmit = (values) => {
        //서버로 데이터 전송하기
        axios.post(`${API_URL}/products`, {
            name: values.name,
            description: values.description,
            seller: values.seller,
            price: parseInt(values.price),
            imageUrl: API_URL + '/' + imageUrl
        }).then((result) => {
            console.log(result);
            history.replace('/');
        })
    }
    //이미지 경로 상태 추가하기
    const [imageUrl, setImageUrl] = useState(null);
    //이미지 처리 함수
    const onChangeImage = (info) => {
        //파일이 업로드 중일 때
        if (info.file.status === 'uploading') {
            return;
        }
        //파일 업로드가 완료되었을 때
        if (info.file.status === 'done') {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            //받은 이미지경로를 imageUrl로 넣어줌
            setImageUrl(imageUrl);
        }
    }
    return (
        <div className="inner" id="upload-container">
            <h1>제품 등록</h1>
            <Form name="product-upload" onFinish={onSubmit}>
                <Form.Item name="upload"
                    label={<div className="upload-label">상품사진</div>}
                >
                    <Upload name="image"
                        action={`${API_URL}/image`}
                        listType="picture"
                        //다른 이미지를 보여주는 속성 제거
                        showUploadList={false}
                        onChange={onChangeImage}
                    >
                        {/* 삼항연산자 사용. 이미지가 있으면 이미지를 나타내고 없으면
                    이미지를 업로드 해주세요가 나타남 */}
                        {
                            imageUrl ? (<img src={`${API_URL}/${imageUrl}`} alt="업로드이미지" />) :
                                (<div id="upload-img-placeholder">
                                    <img src="/images/icons/camera.png" alt="업로드" />
                                    <span>이미지를 업로드 해 주세요.</span>
                                </div>)
                        }


                    </Upload>
                </Form.Item>
                <Form.Item name="seller"
                    label={<div className="upload-label">판매자 명</div>}
                    rules={[{
                        required: true, message: "판매자 이름을 입력하세요."
                    }]}
                >
                    <Input className="upload-name"
                        size="large"
                        placeholder="이름을 입력해주세요."
                    />

                </Form.Item>
                <Form.Item name="name"
                    label={<div className="upload-label">상품이름</div>}
                    rules={[{ required: true, message: "상품 이름을 입력해주세요." }]}
                >
                    <Input className="upload-name"
                        size="large"
                        placeholder="상품 이름을 입력해주세요." />
                </Form.Item>
                <Form.Item name="price"
                    label={<div className="upload-label">상품가격</div>}
                    rules={[{ required: true, message: "상품 가격을 입력해주세요." }]}
                >
                    <Input className="upload-price"
                        size="large"
                        placeholder="상품 가격을 입력해주세요." />
                </Form.Item>
                <Form.Item name="description"
                    label={<div className="upload-label">상품소개</div>}
                    rules={[{ required: true, message: "상품 소개를 입력해주세요." }]}
                >
                    <Input.TextArea
                        size="large"
                        id="product-description"
                        placeholder="상품 소개를 입력해주세요."
                    />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" size="large" htmlType="submit">상품 등록하기</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UploadPage;
