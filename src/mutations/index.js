import gql from "graphql-tag";

export const CREATENOTE = gql`
  mutation CreateNote( $text: String!, $memberId: ID,  $exerciseId: ID) {
     createNote(text: $text, memberId: $memberId, exerciseId: $exerciseId) {
         id
         note_date
         text
     }
  }
`;

export const CREATECHATMESSAGE = gql`
  mutation CreateChatMessage( $text: String, $memberId: ID!,  $exerciseId: ID) {
     createChatMessage(text: $text, memberId: $memberId, exerciseId: $exerciseId) {
         id
         creation_date
         text
     }
  }
`;

export const SAVEEXERCISESETTINGS = gql`
  mutation SaveExerciseSettings( $planexerciseId: ID!, $indications: String, $sets: Int, $weight: Float, $training: Int, $unit: Int, $setsConfig: String) {
     saveExerciseSettings(planexerciseId: $planexerciseId, indications: $indications, sets: $sets, weight: $weight, training: $training, unit: $unit, setsConfig: $setsConfig) {
         indications
         rounds
         weight
         repetitions
         training_unit
         sets {
           weight
           training
           unit
         }
     }
  }
`;

export const CHANGESPLITORDER = gql`
  mutation ChangeSplitOder( $planId: ID!, $split: Int, $newOrder: [Int]) {
     changeSplitOder(planId: $planId, split: $split, newOrder: $newOrder) {
       newOrder
       split
     }
  }
`;

export const CREATEPROTOCOLL = gql`
  mutation CreateProtocoll( $exerciseId: ID!, $memberId: ID!, $executionDate: String!, $training: Int!, $unit: Int!, $weight: Float!) {
     createProtocoll(exerciseId: $exerciseId, memberId: $memberId, executionDate: $executionDate, training: $training, unit: $unit, weight: $weight) {
       id
       execution_date
       weight
       repetitions
       training_unit
       exercise_id
     }
  }
`;

export const DELETEPROTOCOLL = gql`
  mutation DeleteProtocoll( $protocollId: ID!) {
     deleteProtocoll(protocollId: $protocollId) {
       id
     }
  }
`;

export const ADDEXERCISESTOPLAN = gql`
  mutation AddExercisesToPlan( $planId: ID!, $split: Int!, $exercises: String!, $settings: String! ) {
    addExercisesToPlan(planId: $planId, split: $split, exercises: $exercises, settings: $settings) {
      workoutId,
       split
       exercises {
         id
         position
         repetitions
         rounds
         training_unit
         weight
         exercise {
           id
           start_image
           end_image
           name
         }
       }
     }
   }
`;

export const UPLOADFILE = gql`
  mutation FileUpload( $file: Upload!, $memberId: ID! ) {
    fileUpload(file: $file, memberId: $memberId) {
      filename
      mimetype
      encoding
    }
  }
`;

export const UPDATEGOAL = gql`
  mutation UpdateGoal( $goalId: ID!, $targetDate: String ) {
    updateGoal(goalId: $goalId, targetDate: $targetDate) {
      id
      target_date
    }
  }
`;

export const SAVEGOALTARGET = gql`
  mutation SaveGoalTarget( $goalId: ID!, $type: Int, $unit: Int, $targetValue: Float, $initialValue: Float ) {
    saveGoalTarget(goalId: $goalId, type: $type, unit: $unit, targetValue: $targetValue, initialValue: $initialValue) {
      id
      type
      unit
      target_value
      target_history {
        id
        value
      }
    }
  }
`;

export const SAVEGOALTARGETVAUE = gql`
  mutation saveGoalTargetValue( $targetId: ID!, $value: Float, $day: String ) {
    saveGoalTargetValue(targetId: $targetId, value: $value, day: $day) {
      id
      value
      change_date
    }
  }
`;

export const SENDPASSWORDRESET = gql`
  mutation Sendpasswordreset($email: String!) {
    sendpasswordreset(email: $email)
  }
`;

export const REGISTER = gql`
  mutation Register( $email: String!,  $password: String!) {
     register(email: $email, password: $password) {
         message
         user {
          id
        }
     }
  }
`;

export const CLONEPLAN = gql`
  mutation ClonePlan( $planId: ID! ) {
     clonePlan(planId: $planId) {
       id
       name
       description
       days
       duration
       changed_date
       creator_full_name
       creator_image
       expiration_date
       splits{
         id
         name
         exercises {
           id
           indications
           weight
           rounds
           repetitions
           training_unit
           exercise {
             id
             name
             start_image
             end_image
           }
         }
       }
     }
  }
`;

export const DELETEPLAN = gql`
  mutation DeletePlan( $planId: ID! ) {
     deletePlan(planId: $planId) {
       error
       message
       id
     }
  }
`;
