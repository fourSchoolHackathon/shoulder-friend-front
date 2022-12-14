import React, { useEffect, useState } from 'react'
import * as M from './Main.style'

import { Link, useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { storedLocation, storedIsLogin } from '../../stores/location/location'
import {
  storedReqKind,
  storedCategoryInfo
} from '../../stores/requestInfo/requestInfo'
import { subscribe } from '../../utils/webPush'

const Main = () => {
  //카테고리인지 아닌지
  const [reqKind, setReqKind] = useRecoilState(storedReqKind)
  // 카테고리
  const [categoryInfo, setCategoryInfo] = useRecoilState(storedCategoryInfo)

  const [location, setLocation] = useRecoilState(storedLocation)
  const [isLogin, setIsLogin] = useRecoilState(storedIsLogin)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      subscribe()
    }
  }, [])

  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // console.log(position.coords.latitude + ' ' + position.coords.longitude);
          // 저장 후 리다이렉션

          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          // navigate('/req')
        },
        function (error) {
          console.error(error)
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        }
      )
    } else {
      alert('GPS를 지원하지 않습니다')
    }
  }

  function getUserNumber() {
    return localStorage.getItem('userNumber')
  }

  function toggleIsLogin() {
    if (getUserNumber() === null) {
      // 연결이 이미 되어 있다면 getLocation
      setIsLogin(false)
    } else {
      // userNumber가 없다면
      setIsLogin(true)
    }
  }

  function simpleReques() {
    toggleIsLogin()
    getLocation()
    console.log('간단한 도움 요청')
    setReqKind('simple')
    navigate('/req')
  }
  function categoryRequest() {
    if (gender !== '' && selected !== []) {
      toggleIsLogin()
      getLocation()
      console.log('카테고리 도움 요청', gender, selected, startTime, endTime)
      setReqKind('category')
      setCategoryInfo({
        category_list: selected,
        start_at: startTime,
        end_at: endTime,
        sex: gender
      })
      navigate('/req')
    } else {
      alert('카테고리를 완성해주세요')
    }
  }

  // -------

  const now = new Date()
  const [gender, setGender] = useState('')
  const [selected, setSelected] = useState([])

  const [startTime, setStartTime] = useState(
    `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(
      2,
      '0'
    )}-${`${now.getDate()}`.padStart(2, '0')}T${`${now.getHours()}`.padStart(
      2,
      '0'
    )}:${`${now.getMinutes()}`.padStart(2, '0')}`
  )

  const [endTime, setEndTime] = useState(
    `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(
      2,
      '0'
    )}-${`${now.getDate()}`.padStart(2, '0')}T${`${
      now.getHours() + 2 > 23 ? now.getHours() + 2 - 24 : now.getHours() + 2
    }`.padStart(2, '0')}:${`${now.getMinutes()}`.padStart(2, '0')}`
  )

  const service = [
    '이동보조',
    '말벗',
    '주변정리',
    '식사보조',
    '목욕보조',
    '배변보조',
    '체위변경',
    '투약보조',
    '운동보조'
  ]

  /**인자값으로 들어온 서비스가 이미 선택된 것이라면 true */
  function findService(service) {
    return selected.includes(service)
  }
  function handleService(service) {
    // 이미 있었다면 취소
    if (findService(service)) {
      setSelected(prev => prev.filter(e => e !== service))
    } else {
      // 없으니 추가
      setSelected(prev => [...prev, service])
    }
  }

  /**
   * @point start인지 end인지
   * @index T로 나웠을 때 index
   * @value 변경할 값
   */
  function timeHandler(point, index, value) {
    let temp
    if (point === 'start') {
      temp = startTime.split('T')
      temp[index] = value
      setStartTime(temp.join(''))
    } else {
      temp = endTime.split('T')
      temp[index] = value
      setEndTime(temp.join(''))
    }
  }

  const onLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/')
  }

  return (
    <M.Wrapper>
      <M.HeaderWrapper>
        <h3 style={{ fontSize: '1.5rem' }}>어깨동무</h3>
        {localStorage.getItem('access_token') ? (
          <a onClick={onLogout}>로그아웃</a>
        ) : (
          <div>
            <Link to="/signin">로그인</Link> /{' '}
            <Link to="/signup">회원가입</Link>
          </div>
        )}
      </M.HeaderWrapper>

      <M.SimpleReqWrapper>
        <M.SimpleComments>
          <h3>빠른 도움 요청</h3>
          <p>현재 위치를 기반으로 빠르게 도움을 요청하세요</p>
        </M.SimpleComments>
        <M.ButtonWrapper>
          <button onClick={simpleReques}>요청하기</button>
        </M.ButtonWrapper>
      </M.SimpleReqWrapper>

      <M.CategoryReqWrapper>
        <M.CategoryComments>
          <h3>카테고리로 요청</h3>
          <p>카테고리 선택으로 정확하게 도움을 요청하세요</p>
        </M.CategoryComments>

        <M.CategoryWrapper>
          <M.GenderCategory>
            <h3>성별</h3>
            <M.InputWrapper>
              <M.LeftInput
                type="radio"
                id="select"
                name="gender"
                onClick={() => setGender('남자')}
              />
              <label htmlFor="select">남성</label>
              <M.RightInput
                type="radio"
                id="select2"
                name="gender"
                onClick={() => setGender('여성')}
              />
              <label htmlFor="select2">여성</label>
            </M.InputWrapper>
          </M.GenderCategory>

          <h3>서비스</h3>
          <M.Categorys>
            {service.map(i => (
              <M.Category
                onClick={() => handleService(i)}
                isExist={findService(i)}
                key={i}
              >
                {i}
              </M.Category>
            ))}
          </M.Categorys>

          <h3>시간</h3>
          <M.DateWrapper>
            <M.InputsWrapper>
              <M.SplitInput>
                <h4>시작일</h4>
                <input
                  type="date"
                  defaultValue={startTime.split('T')[0]}
                  onChange={e => timeHandler('start', 0, e.target.value)}
                />
              </M.SplitInput>
              <M.SplitInput>
                <h4>종료일</h4>
                <input
                  type="date"
                  defaultValue={endTime.split('T')[0]}
                  onChange={e => timeHandler('end', 0, e.target.value)}
                />
              </M.SplitInput>
            </M.InputsWrapper>
            <M.InputsWrapper>
              <M.SplitInput>
                <h4>시작 시간</h4>
                <input
                  type="time"
                  defaultValue={startTime.split('T')[1]}
                  onChange={e => timeHandler('start', 1, e.target.value)}
                />
              </M.SplitInput>
              <M.SplitInput>
                <h4>종료 시간</h4>
                <input
                  type="time"
                  defaultValue={endTime.split('T')[1]}
                  onChange={e => timeHandler('end', 1, e.target.value)}
                />
              </M.SplitInput>
            </M.InputsWrapper>
          </M.DateWrapper>
        </M.CategoryWrapper>

        <M.CategoryButtonWrapper>
          <button onClick={categoryRequest}>요청하기</button>
        </M.CategoryButtonWrapper>
      </M.CategoryReqWrapper>

      <M.Temp />
    </M.Wrapper>
  )
}

export default Main
