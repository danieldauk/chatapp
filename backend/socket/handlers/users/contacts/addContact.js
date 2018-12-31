const winston = require('winston');
const { User } = require('../../../../model/user');
const { Conversation } = require('../../../../model/conversation');
const validateObjectId = require('../../../../utils/sharedJoiSchemas/validateObjectId');
const { SocketEventsEnum } = require('../../../../utils/enumerators');

module.exports = async (socket, userId, contactId) => {
  const validationResult = validateObjectId(contactId);
  if (validationResult.error) {
    socket.emit(SocketEventsEnum.ERROR, {
      error: validationResult.error.details[0].message
    });
    return;
  }

  try {
    // check if contact (user) with given id exists
    const newContact = await User.findOne({
      _id: contactId
    });
    if (!newContact) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'User not found'
      });
      return;
    }

    // check if user does not exist inside contacts array
    const contact = await User.findOne({
      _id: userId,
      'contacts.contact': newContact._id
    });
    // if user exists - return error
    if (contact) {
      socket.emit(SocketEventsEnum.ERROR, {
        error: 'User already exists in contacts list'
      });
      return;
    }

    // check if conversation with given participants exist
    let conversation = await Conversation.findOne({
      $and: [
        {
          participants: {
            $size: 2
          }
        },
        {
          participants: {
            $all: [userId, contactId]
          }
        },
        {
          title: { $exists: false }
        }
      ]
    });
    // if it doesn't exist - create conversation (dialogue) with new contact
    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, contactId]
      });
      await conversation.save();
    }
    // if user does not exist - push contact to array
    await User.updateOne(
      {
        _id: userId
      },
      {
        $push: {
          contacts: {
            contact: newContact._id,
            conversationId: conversation._id
          }
        }
      }
    );
    // add requesting user to contact's contacts list
    await User.updateOne(
      {
        _id: newContact._id
      },
      {
        $push: {
          contacts: {
            contact: userId,
            conversationId: conversation._id
          }
        }
      }
    );

    socket.emit(SocketEventsEnum.RESPONSE_ADD_CONTACT, {
      message: 'User was successfully added to contacts list'
    });
    socket.to(newContact._id).emit(SocketEventsEnum.RESPONSE_ADD_CONTACT, {
      message: 'User was successfully added to contacts list'
    });
  } catch (error) {
    winston.error(error);
    socket.emit(SocketEventsEnum.ERROR, {
      error: error.message
    });
  }
};
