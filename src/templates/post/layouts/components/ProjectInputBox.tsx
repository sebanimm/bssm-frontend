import { Input } from "@/components/atoms";
import React from "react";
import { Column, Row } from "@/components/Flex";
import styled from "styled-components";
import { color, font } from "@/styles";
import POST_INPUT from "../../constants/postInput.constant";
import { PostCategoryInputBoxProps } from "../../interfaces";
import { dateTime } from "../../assets/data";

const ProjectInputBox = ({
  handleChange,
  postData,
}: PostCategoryInputBoxProps) => {
  return (
    <>
      <Input
        label="프로젝트 분야"
        placeholder="프로젝트의 분야를 입력해주세요 ex) 웹, 앱"
        name={POST_INPUT.FIELD}
        onChange={handleChange}
        value={postData.field}
      />
      <Row gap="12px">
        {dateTime.map(({ name, dataName, label }) => (
          <Column gap="4px">
            <TitleInputLabelText>{label}</TitleInputLabelText>
            <DateInput
              name={name}
              onChange={handleChange}
              value={postData[dataName]}
              type="date"
            />
          </Column>
        ))}
      </Row>
    </>
  );
};

const TitleInputLabelText = styled.h1`
  ${font.p3};
`;

const DateInput = styled.input`
  padding: 10px 14px;
  background-color: ${color.white};
  ${font.caption};
`;

export default ProjectInputBox;
