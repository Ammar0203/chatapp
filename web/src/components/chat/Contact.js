import { Avatar } from 'components'
import moment from 'moment'
import { Badge } from 'reactstrap'

const Contact = props => {
return(
  <div className='contact'>

    <div>
      <Avatar src={props.contact.avatar} />
      {props.contact.status == true ? <i className='fa fa-circle online' /> : ''}
    </div>

    <div className='w-50'>

      <div className='name'>{props.contact.name}</div>

      <div className='small laast-message' style={{textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden'}}>
        {props.message ? props.message.content : 'انقر هنا لبدء المحادثة' }
      </div>

    </div>

    <div className='flex-grow-1 text-left'>
      <div className='small text-muted'>
        {props.message ? moment(props.message.date).format("hh:mm a") : ''}
      </div>
      { props.unseen > 0 ? <Badge color='success'>{props.unseen}</Badge> : ''}
    </div>
  </div>
)
}
export default Contact