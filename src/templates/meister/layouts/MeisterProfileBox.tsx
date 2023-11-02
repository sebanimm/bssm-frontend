import { Column, Row } from "@/components/Flex";
import useUser from "@/hooks/useUser";
import { color, font } from "@/styles";
import React from "react";
import styled from "styled-components";

interface IMeisterProfileBoxProps {
  meister: {
    score: number;
    positivePoint: number;
    negativePoint: number;
  };
  name: string;
}

const MeisterProfileBox = ({ meister, name }: IMeisterProfileBoxProps) => {
  const { isLogined } = useUser();

  return (
    <Container>
      {isLogined && (
        <>
          <Column>
            <Row alignItems="center" gap="5px">
              <Name>{name}</Name>
            </Row>
            <MeisterPoint>{meister.score}</MeisterPoint>
            <Row alignItems="center" gap="8px">
              <CreditPoint>{meister.positivePoint}</CreditPoint>
              <Separator />
              <DemeritPoint>{meister.negativePoint}</DemeritPoint>
            </Row>
          </Column>
          <MyPageButton />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 14px 24px;
  background-color: ${color.white};
  display: flex;
  align-items: center;
  gap: 18px;
`;

const InfomationText = styled.span`
  ${font.H6};
  color: ${color.black};
`;

const Name = styled(InfomationText)``;

const RewardPointText = styled.span`
  ${font.p3};
  line-height: 130%;
  color: ${color.gray};

  &:after {
    content: "점";
  }
`;

const MeisterPoint = styled(RewardPointText)`
  &:before {
    content: "마이스터역량인증제 점수 ㆍ ";
  }
`;

const CreditPoint = styled(RewardPointText)`
  &:before {
    content: "상점 ㆍ ";
  }
`;

const Separator = styled.div`
  width: 1.5px;
  background-color: ${color.on_tertiary};
  height: 12px;
`;

const DemeritPoint = styled(RewardPointText)`
  &:before {
    content: "벌점 ㆍ ";
  }
`;

const MyPageButton = styled.div`
  padding: 4px 10px;
  border-radius: 4px;
  margin-left: auto;
  background-color: ${color.primary_blue};
  ${font.btn3};
  color: ${color.white};
  cursor: pointer;

  &:after {
    content: "내 정보";
  }
`;

export default MeisterProfileBox;
