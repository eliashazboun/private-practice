import React from 'react'
import './ProfileTab.scss'
import ContentBox from '../../ContentBox/ContentBox'
import ContentRow from '../../ContentBox/ContentRow'
import ContentItem from '../../ContentBox/ContentItem'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileTab = ({client}) => {
  console.log(client)

  const getAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;

  }

  const birthday = new Date(client.birthday).toLocaleDateString()
  const age = getAge(birthday)

  return (
    <div className='profileTab'>
      <ContentBox heading={'Personal Information'}>
        <ContentRow>
          <ContentItem value={birthday} label='Birthday'/>
          <ContentItem value={age} label='Age'/>
          <ContentItem value={client.gender} label='Gender'/>
          <ContentItem value={'Single'} label='Marital Status'/>
        </ContentRow>
        <ContentRow>
          <ContentItem value={'Employed'} label='Employment'/>
          <ContentItem value={'[pronouns here]'} label='Pronouns'/>
          <ContentItem value={'English'} label='Preferred Language'/>
          <ContentItem value={'Bachelors'} label='Education Level'/>
        </ContentRow>
      </ContentBox>

      { /*Need to create contact field in database then map over these to give add button functionality*/ }
      <ContentBox heading={'Phones and Emails'} addButton={true}>
        <ContentRow spacing={'space-between'}>
          <ContentItem value={client.phone} label={'Mobile'}></ContentItem>
          <div className="icons">
            <ModeEditIcon/>
            <ContentCopyIcon/>
            <DeleteIcon/>
          </div>
         

        </ContentRow>
      </ContentBox>
    </div>
  )
}

export default ProfileTab