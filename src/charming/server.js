export const manifest = {
  $schema:'https://charm.ing/schema/app-manifest/2026-10-16.json',
  id:'vascout-concept-20261020',
  meta:{name:'VASCOUT',icon:{emoji:'🔬',bg:'#C8742B'}},
  capabilities:{imports:['charming:storage/kv@1.0','charming:storage/blob@1.0']}
};
const questionIds=['imaging','coupling','pigmentation','foreign-body','usability','clinical-pathway'];
export const routes = [
  {
    op:'getReviews',method:'GET',title:'Read research review notes',
    description:'Read saved discussion notes and open/reviewed status. These are not clinical validation records.',
    annotations:{readOnlyHint:true},inputSchema:{type:'object',properties:{},additionalProperties:false},
    outputSchema:{type:'object',properties:{reviews:{type:'object'}},required:['reviews']},
    handler:async(_input,{env})=>{
      const reviews={};
      for(const id of questionIds){const value=await env.storage.get('review:'+id);if(value!==undefined&&value!==null)reviews[id]=value;}
      return {reviews};
    }
  },
  {
    op:'saveReview',method:'POST',title:'Save a research review note',
    description:'Save an explicit owner discussion note, not patient data. Reviewed means discussed, not clinically validated.',
    annotations:{readOnlyHint:false},
    inputSchema:{type:'object',required:['questionId','text','reviewed'],additionalProperties:false,properties:{questionId:{type:'string',enum:['imaging','coupling','pigmentation','foreign-body','usability','clinical-pathway']},text:{type:'string',maxLength:4000},reviewed:{type:'boolean'}}},
    outputSchema:{type:'object',required:['text','reviewed','updatedAt'],properties:{text:{type:'string'},reviewed:{type:'boolean'},updatedAt:{type:'string'}}},
    handler:async(input,{env})=>{
      if(!input||!questionIds.includes(input.questionId))throw new Error('Unknown research question');
      if(typeof input.text!=='string'||input.text.length>4000)throw new Error('Note length must be at most 4000 characters');
      if(typeof input.reviewed!=='boolean')throw new Error('Reviewed must be a boolean');
      const value={text:input.text,reviewed:input.reviewed,updatedAt:new Date().toISOString()};
      await env.storage.put('review:'+input.questionId,value);return value;
    }
  }
];
