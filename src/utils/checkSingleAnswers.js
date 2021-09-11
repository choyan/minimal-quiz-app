export default function checkSingleAnswers(questionList) {
  const allAnsLengths = [];
  questionList.forEach((question) => allAnsLengths.push(question.answers.length));
  return !!allAnsLengths.includes(1);
}
