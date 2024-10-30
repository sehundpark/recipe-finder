import React from "react";
import styled from "styled-components";

export const RenderNotice = () => {
  return (
    <NoticeContainer>
      <NoticeContent>
        <NoticeText>
          <NoticeTitle>Demo Server Notice</NoticeTitle>
          <NoticeDescription>
            This project uses Render's free tier hosting. The server
            automatically spins down after periods of inactivity, which can
            cause the first request to take 50 seconds or more while the server
            restarts. Please be patient if you notice an initial delay.
          </NoticeDescription>
        </NoticeText>
      </NoticeContent>
    </NoticeContainer>
  );
};

const NoticeContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${({ theme }) => `${theme.colors.primary}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  border-radius: 0.75rem;
`;

const NoticeContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const NoticeText = styled.div`
  flex: 1;
`;

const NoticeTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const NoticeDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
`;
