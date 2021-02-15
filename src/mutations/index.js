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
  mutation CreateProtocoll( $exerciseId: ID!, $executionDate: String!, $training: Int!, $unit: Int!, $weight: Float!) {
     createProtocoll(exerciseId: $exerciseId, executionDate: $executionDate, training: $training, unit: $unit, weight: $weight) {
       id
       execution_date
       weight
       repetitions
       training_unit
       exercise_id
     }
  }
`;

export const CREATEPROTOCOLLS = gql`
  mutation CreateProtocolls( $protocolls: String!) {
     createProtocolls(protocolls: $protocolls) {
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
  mutation Register( $email: String!, $recaptchaToken: String!, $gym: String, $language: String) {
     register(email: $email, recaptchaToken: $recaptchaToken, gym: $gym, language: $language) {
         message
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

export const CCLOGIN = gql`
  mutation CcLogin( $token: String!) {
     cclogin(token: $token) {
       token
     }
  }
`;

export const SAVEWEIGHT = gql`
  mutation SaveWeight( $weight: Float!, $recordDate: String!) {
     saveWeight(weight: $weight, recordDate: $recordDate) {
       id
       record_date
       value
     }
  }
`;

export const DELETEWEIGHT = gql`
  mutation DeleteWeight( $weightId: ID!) {
     deleteWeight(weightId: $weightId) {
       id
       record_date
       value
     }
  }
`;

export const UPDATEPROFILE = gql`
  mutation UpdateProfile( $firstName: String, $lastName: String, $email: String, $birthday: String, $gender: Int, $language: String) {
     updateProfile(firstName: $firstName, lastName: $lastName, email: $email, birthday: $birthday, gender: $gender, language: $language) {
       id
       first_name
       last_name
       email
       birthday
       gender
       language
     }
  }
`;

export const LINK = gql`
  mutation Link( $buId: ID!) {
     link(buId: $buId) {
       id
       name
       imageUrl
     }
  }
`;

export const UNLINK = gql`
  mutation Unlink( $buId: ID!) {
     unlink(buId: $buId) {
       id
     }
  }
`;

export const ACCEPTREQUEST = gql`
  mutation AcceptRequest( $requestId: ID!) {
     acceptRequest(requestId: $requestId) {
       id
     }
  }
`;

export const DECLINEREQUEST = gql`
  mutation DeclineRequest( $requestId: ID!) {
     declineRequest(requestId: $requestId) {
       id
     }
  }
`;

export const DELETEACCOUNT = gql`
  mutation DeleteAccount {
     deleteAccount {
       id
     }
  }
`;

export const CONTACTREQUEST = gql`
  mutation ContactRequest( $memberId: ID!, $reference: String!, $date: String!, $phoneNr: String, $comment: String) {
     contactRequest(memberId: $memberId, reference: $reference, date: $date, phoneNr: $phoneNr, comment: $comment) {
       success
       error
     }
  }
`;

export const ADDTOFAVORITES = gql`
  mutation AddToFavorites( $exerciseId: ID!) {
     addToFavorites(exerciseId: $exerciseId) {
       success
       error
     }
  }
`;

export const DELETEFROMFAVORITES = gql`
  mutation DeleteFromFavorites( $exerciseId: ID!) {
     deleteFromFavorites(exerciseId: $exerciseId) {
       success
       error
     }
  }
`;

export const CREATECHATMESSAGE = gql`
  mutation CreateChatMessage( $text: String,  $exerciseId: ID) {
     createChatMessage(text: $text, exerciseId: $exerciseId) {
         id
         creation_date
         text
     }
  }
`;

export const MARKCHATMESSAGES = gql`
  mutation MarkChatMessages( $exerciseId: ID) {
     markChatMessages(exerciseId: $exerciseId) {
         success
         error
     }
  }
`;
