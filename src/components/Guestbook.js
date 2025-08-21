import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  orderBy, 
  query, 
  serverTimestamp 
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Guestbook.css';


const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const messagesCollection = collection(db, 'guestbook_messages');
      const q = query(messagesCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // 일단 DB 로딩만 확인하고, 이미지는 별도로 처리
  const isContentReady = !isInitialLoading;

  // 스켈레톤 로딩 컴포넌트
  const SkeletonLoader = () => (
    <div className="skeleton-container">
      <div className="skeleton-background">
        {/* 파티클 효과 */}
        <div className="background-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* 스켈레톤 아치 */}
        <div className="skeleton-arch-container">
          <div className="skeleton-arch"></div>
          <div className="skeleton-loading-text">
            <p>축복의 공간을 준비하고 있어요...</p>
          </div>
        </div>
      </div>
      
      {/* 스켈레톤 헤더 */}
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-subtitle"></div>
      </div>
      
      {/* 스켈레톤 하트들 */}
      <div className="skeleton-hearts-container">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="skeleton-heart"
            style={{
              left: `${Math.random() * 70 + 10}%`,
              top: `${Math.random() * 60 + 20}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* 스켈레톤 버튼 */}
      <div className="skeleton-button"></div>
    </div>
  );

  const handleHeartClick = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error('이름과 메시지를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const posX = Math.random() * 70 + 10; // 10-80% range
      const posY = Math.random() * 60 + 20; // 20-80% range

      await addDoc(collection(db, 'guestbook_messages'), {
        name: formData.name.trim(),
        message: formData.message.trim(),
        posX: posX,
        posY: posY,
        createdAt: serverTimestamp()
      });

      toast.success('축하 메시지가 등록되었습니다! ❤️');
      setFormData({ name: '', message: '' });
      setShowForm(false);
      fetchMessages();
    } catch (error) {
      console.error('Error saving message:', error);
      toast.error('메시지 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const generateRandomPosition = () => {
    const x = Math.random() * 70 + 10; // 10-80%
    const y = Math.random() * 60 + 20; // 20-80%
    return { left: `${x}%`, top: `${y}%` };
  };

  if (!isContentReady) {
    return <SkeletonLoader />;
  }

  return (
    <div className="guestbook-container">
      <div className="guestbook-background">
        {/* 어두운 배경 파티클 효과 */}
        <div className="background-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* 웨딩 아치 이미지 */}
        <div className="wedding-arch-container">
          {/* 부드러운 안개 효과 */}
          <div className="mist-effect mist-1"></div>
          <div className="mist-effect mist-2"></div>
          <div className="mist-effect mist-3"></div>
          
          <img 
            src="/assets/wedding_arch with_flowers.png" 
            alt="Wedding Arch with Flowers" 
            className="wedding-arch-image"
            onLoad={handleImageLoad}
          />
          
        </div>
      </div>

      <div className="hearts-container">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className="heart-icon"
            style={{
              left: `${message.posX}%`,
              top: `${message.posY}%`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 500,
              damping: 10
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleHeartClick(message)}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="guestbook-header">
        <h1 className="guestbook-title">축하 메시지</h1>
        <p className="guestbook-subtitle">하트를 클릭해서 메시지를 확인하세요</p>
      </div>

      <button
        className="add-message-btn"
        onClick={() => setShowForm(true)}
      >
        + 메시지 남기기
      </button>

      <AnimatePresence>
        {showModal && selectedMessage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <div className="message-display">
                <h3 className="message-author">{selectedMessage.name}</h3>
                <p className="message-text">{selectedMessage.message}</p>
                <span className="message-date">
                  {selectedMessage.createdAt ? new Date(selectedMessage.createdAt.toDate()).toLocaleDateString('ko-KR') : ''}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="modal-content form-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
              <form onSubmit={handleSubmit} className="message-form">
                <h3 className="form-title">축하 메시지 남기기</h3>
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">메시지</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="축하 메시지를 입력하세요"
                    rows="4"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? '등록 중...' : '메시지 등록'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guestbook;