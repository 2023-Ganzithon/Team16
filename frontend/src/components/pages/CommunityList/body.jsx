import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import {
    Container, Title, Content, PostButton, Liststitle, Listscontent, Listsbottom,
    Info, Placename, Word, Commentnum, Date
} from "./style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';




const CommunityList = () => {
    const [title, setTitle] = useState("커뮤니티 글 제목")
    const [content, setContent] = useState("커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용커뮤니티 글 내용 커뮤니티 글 내용커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용커뮤니티 글 내용 커뮤니티 글 내용커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용 커뮤니티 글 내용")
    const [userData, setUserData] = useState([]);
    const [isplogging, setIsplogging] = useState(true);
    const navigate = useNavigate();
    const [showFullContent, setShowFullContent] = useState(false); // 추가

    const token = localStorage.getItem('token')




    const navigateToWrite = () => {
        navigate('/community-write');
    };

    const getfeed = async () => {
        try {
            const response = await axios.get('https://20ab-39-125-96-44.ngrok-free.app/api/community/list');
            console.log(response.data);
            console.log('글 목록.');
        } catch (error) {
            alert('글 목록 불러오기에 실패했습니다.')
            console.error(error)
        }

    };

    const getUser = async () => {
        try{
            const response = await axios.get('https://983d-39-125-96-44.ngrok-free.app/member', {
                "X-AUTH-TOKEN": token,
            });
            console.log("성공")
            setUserData(response.data);
            console.log(userData)
        }
            catch(error){
                console.log('유저 정보 가져오기 실패')
                console.error(error);   
            }
        }

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    const onClickPlogging = () => {
        setIsplogging(true)
    }

    const onClickReview = () => {
        setIsplogging(false)
    }

    const limitedContent = content.length > 150 ? `${content.slice(0, 200)}...더 보기` : content; // 100자로 제한

    useEffect(() => {
        getUser();
        getfeed();
    },[])

    return (
        <div className='main-font'>
            <Container >
                <Title>
                    <Word>커뮤니티</Word>
                    <PostButton onClick={navigateToWrite}>글쓰기</PostButton>
                </Title>
                < Link to='/community-feed'>
                    <Content>
                        <Liststitle>{title}</Liststitle>
                        <Listscontent>
                            {showFullContent ? content : limitedContent}
                        </Listscontent>
                        <Listsbottom>
                            <Commentnum>
                                <FontAwesomeIcon icon={faComment} style={{ color: "38AF00", marginRight: "5px", marginTop: "3px" }} />
                                <div>개수</div>
                            </Commentnum>
                            <Date>
                                날짜
                            </Date>
                        </Listsbottom>
                    </Content>
                </Link>
            </Container>
        </div>

    );
}

export default CommunityList;