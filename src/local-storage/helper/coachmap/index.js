import RealmManager from '../../realm-manager';
import { CoachmapQuestionTemplate } from '../../schemas';

export const getCoachMapQuestionsJson = async (applicable_to) => {
  const questions = await getCoachMapQuestions(applicable_to);
  return questions;
};

export const getCoachMapQuestions = async (applicable_to) => {
  const items = await RealmManager.getInstance().read(CoachmapQuestionTemplate.name, { applicable_to });
  const groups = {};
  const groupTitleJson = {};
  items.forEach((item) => {
    const { skill_map_group_id, skill_map_group_title } = item;
    let questions = groups[skill_map_group_id];
    if (!questions) questions = [];
    questions.push(item);
    groups[skill_map_group_id] = questions;
    groupTitleJson[skill_map_group_id] = skill_map_group_title;
  });

  return Object.keys(groups).map((skill_map_group_id) => ({
    skill_map_group_id,
    skill_map_group_title: groupTitleJson[skill_map_group_id],
    questions: parseQuestions(groups[skill_map_group_id])
  }));
};

function parseQuestions(items) {
  const questionsJson = {};
  const questionTitleJson = {};
  items.forEach((item) => {
    const {
      skill_map_id, skill_map_title, skill_map_rating_id, skill_map_rating_title, skill_map_rating_score
    } = item;
    let options = questionsJson[skill_map_id];
    if (!options) options = [];
    questionTitleJson[skill_map_id] = skill_map_title;
    options.push({
      skill_map_id,
      skill_map_title,
      skill_map_rating_id,
      skill_map_rating_title,
      skill_map_rating_score
    });
    questionsJson[skill_map_id] = options;
  });

  return Object.keys(questionsJson).map((skill_map_id) => {
    const question = {
      skill_map_id,
      skill_map_title: questionTitleJson[skill_map_id],
      options: questionsJson[skill_map_id]
    };
    return question;
  });
}

export const createCoachMapQuestions = async (desig_group_code, questions) => {
  deleteCoachmapQuestions(desig_group_code);
  const items = questions.map((question) => {
    const {
      skill_map_group_id, skill_map_group_title, skill_map_id, skill_map_title, skill_map_rating_id,
      skill_map_rating_title, skill_map_rating_score, skill_map_type_id, skill_map_type_title, applicable_to
    } = question;
    return {
      desig_group_code,
      skill_map_group_id,
      skill_map_group_title,
      skill_map_id,
      skill_map_title,
      skill_map_rating_id,
      skill_map_rating_title,
      skill_map_rating_score,
      skill_map_type_id,
      skill_map_type_title,
      applicable_to
    };
  });
  RealmManager.getInstance().write(CoachmapQuestionTemplate.name, items);
};

export const deleteCoachmapQuestions = (desig_group_code) => {
  RealmManager.getInstance().delete(CoachmapQuestionTemplate.name, { desig_group_code });
};
