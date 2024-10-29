import React from "react";
import styled from "styled-components";

export const ApiLimitNotice = () => {
  return (
    <NoticeContainer>
      <NoticeContent>
        <NoticeText>
          <NoticeTitle>Demo API Limitations</NoticeTitle>
          <NoticeDescription>
            This is a portfolio demo project using the free Edamam API tier
            which is limited to:
            <br />
            <br />
            10 API calls per minute
            <br />
            10,000 API calls per month
            <br />
            <br />
            Please be mindful of these limits when searching. If searches fail,
            please wait a minute before trying again.
          </NoticeDescription>
        </NoticeText>
      </NoticeContent>
    </NoticeContainer>
  );
};

const NoticeContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
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
