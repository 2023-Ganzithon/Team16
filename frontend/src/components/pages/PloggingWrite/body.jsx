import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import {
  Container, Title, Word, Content, PostButton, Titleinput,
  Info, Place, Maininput, Timeinput, Peopleinput, Chatinput, Placename, Placeinputs,
  Startinput, Finishinput, Icon
} from "./style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';




const PloggingWrite = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [ampm, setAmpm] = useState("")
  const [time, setTime] = useState("")
  const [number, setNumber] = useState(10)
  const [chat, setChat] = useState("")
  const [start, setStart] = useState("")
  const [finish, setFinish] = useState("")
  const [userData, setUserData] = useState([]);



  //   const postfeed = asynccons () => {
  //     try {
  //         const response = await Api.post('',{
  //             : title,
  //             : content,
  //             : time,
  //             : number,
  //             : chat,
  //             : start,
  //             : finish
  //         });
  //         console.log(response.data);
  //         alert('게시되었습니다.');
  //     } catch (error) {
  //         alert('업로드에 실패했습니다.')
  //         console.error(error)
  //     }

  // };

  // const getUser = async () => {
  //     try{
  //         const response = await Api.get('');
  //         setUserData(response.data);
  //         console.log(userData)
  //     }
  //         catch(error){
  //             console.log('유저 정보 가져오기 실패')
  //             console.error(error);   
  //         }
  //     }
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const onChangeyear = (e) => {
    const selectedValue = e.target.value; // 선택된 값
    setYear(selectedValue); // 선택된 값을 상태에 저장
  };

  const onChangemonth = (e) => {
    const selectedValue = e.target.value; // 선택된 값
    setMonth(selectedValue); // 선택된 값을 상태에 저장
  };

  const onChangeday = (e) => {
    const selectedValue = e.target.value; // 선택된 값
    setDay(selectedValue); // 선택된 값을 상태에 저장
  };

  const onChangeampm = (e) => {
    const selectedValue = e.target.value; // 선택된 값
    setAmpm(selectedValue); // 선택된 값을 상태에 저장
  };

  const onChangetime = (e) => {
    const selectedValue = e.target.value; // 선택된 값
    setTime(selectedValue); // 선택된 값을 상태에 저장
  };


  const onChangeNumber = (e) => {
    setNumber(e.target.value)
  }
  const onChangeChat = (e) => {
    setChat(e.target.value)
  }

  const onChangeStart = (e) => {
    setStart(e.target.value)
  }
  const onChangeFinish = (e) => {
    setFinish(e.target.value)
  }


  return (
    <Container >
      <Title>
        <Word>같이줍깅</Word>
        <PostButton>글 올리기</PostButton>
      </Title>
      <Content>
        <Info>
          <Titleinput
            placeholder='제목을 입력하세요.'
            value={title}
            onChange={onChangeTitle}
          />
          <Maininput
            placeholder='내용을 입력하세요.'
            value={content}
            onChange={onChangeContent}
          />
          <div>
            <FontAwesomeIcon icon={faClock} style={{ color: "38A800", marginRight: "10px" }} />
            일시
          </div>
          <Timeinput>
            <select onChange={onChangeyear} id="years">
              <option value="" disabled selected hidden>연도</option>
              <option value={2023}>2023년</option>
              <option value={2024}>2024년</option>
              <option value={2025}>2025년</option>
            </select>
            <select onChange={onChangemonth} id="months">
              <option value="" disabled selected hidden>월</option>
              {[...Array(12)].map((_, index) => (
                <option key={index + 1} value={index + 1}>{`${index + 1}월`}</option>
              ))}
            </select>
            <select onChange={onChangeday} id="days">
              <option value="" disabled selected hidden>일</option>
              {[...Array(31)].map((_, index) => (
                <option key={index + 1} value={index + 1}>{`${index + 1}일`}</option>
              ))}
            </select>
            <select onChange={onChangeampm} id="ampm">
              <option value="" disabled selected hidden>오전/오후</option>
              <option value={"am"}>오전</option>
              <option value={"pm"}>오후</option>
            </select>
            <select onChange={onChangetime} id="time">
              <option value="" disabled selected hidden>시</option>
              {[...Array(12)].map((_, index) => (
                <option key={index + 1} value={index + 1}>{`${index + 1}시`}</option>
              ))}
            </select>
          </Timeinput>


          <div>
            <FontAwesomeIcon icon={faUser} style={{ color: "38A800", marginRight: "10px" }} />
            최대 가능 인원
          </div>
          <Peopleinput
            value={number}
            onChange={onChangeNumber}
          />
          <div>
            <FontAwesomeIcon icon={faComment} style={{ color: "38A800", marginRight: "10px" }} />
            오픈채팅 링크
          </div>
          <Chatinput
            value={chat}
            onChange={onChangeChat}
          />
        </Info>
        <Place>
          <Placename>
            <Icon>
              <FontAwesomeIcon icon={faLocationDot} />
            </Icon>
            <div>정동진 해수욕장</div>
          </Placename>
          <Placeinputs>
            <Startinput
              placeholder='출발지 입력'
              value={start}
              onChange={onChangeStart}
            />
            <Finishinput
              placeholder='도착지 입력'
              value={finish}
              onChange={onChangeFinish}
            />
          </Placeinputs>
        </Place>
      </Content>
    </Container>

  );
}

export default PloggingWrite;