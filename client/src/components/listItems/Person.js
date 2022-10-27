import { useState } from 'react'

import { BorderOutlined, EditOutlined } from '@ant-design/icons'
import Cars from '../lists/Cars'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemoveCar'
import UpdatePerson from '../forms/UpdatePerson'

const getStyles = () => ({
  card: {
    width: '500px'
    
  }
})
const Person = props => {
  const { id, firstName, lastName } = props
  const styles = getStyles()

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={id} />
          ]}
        >
          {firstName} {lastName}
          <Cars id={id}></Cars>
        </Card>
      )}
    </>
  )
}

export default Person