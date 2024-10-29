import React from "react";
import styled, { keyframes } from "styled-components";

export const RecipeSkeleton = () => {
  return (
    <SkeletonCard>
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonTitle />
        <SkeletonMeta>
          <SkeletonMetaItem />
          <SkeletonMetaItem />
        </SkeletonMeta>
        <SkeletonTags>
          <SkeletonTag />
          <SkeletonTag />
          <SkeletonTag />
        </SkeletonTags>
        <SkeletonButton />
      </SkeletonContent>
    </SkeletonCard>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => `${theme.colors.border}40`} 25%,
    ${({ theme }) => `${theme.colors.border}80`} 37%,
    ${({ theme }) => `${theme.colors.border}40`} 63%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 0.5rem;
`;

const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  padding-top: 66.67%;
  border-radius: 0;
`;

const SkeletonContent = styled.div`
  padding: 1rem;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.5rem;
  width: 80%;
  margin-bottom: 1rem;
`;

const SkeletonMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SkeletonMetaItem = styled(SkeletonBase)`
  height: 1rem;
  width: 4rem;
`;

const SkeletonTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SkeletonTag = styled(SkeletonBase)`
  height: 1.5rem;
  width: 4rem;
`;

const SkeletonButton = styled(SkeletonBase)`
  height: 2.5rem;
  width: 100%;
`;
