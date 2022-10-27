import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import { ADD_PERSON, GET_PEOPLE } from '../../queries'

const AddPerson=() =>{
const  [id] = useState(uuidv4())
const [addPerson] = useMutation(ADD_PERSON)

const [form] = Form.useForm()
const [, forceUpdate] = useState()


useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addPerson({
        variables: {
          id,
          firstName,
          lastName
        },

        update: (cache, { data: { addCar } }) => {
            const data = cache.readQuery({ query: GET_PEOPLE })
            cache.writeQuery({
              query: GET_PEOPLE,
              data: {
                ...data,
                people: [...data.people, addPerson]
              }
            })
          }
        })
      }
      return (
        <Form
          form={form}
          name='add-person-form'
          layout='inline'
          onFinish={onFinish}
          size='large'
          style={{ marginBottom: '40px' }}
        >

          <Form.Item
            name='firstName'
            label="First Name"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input placeholder='i.e. John' />
          </Form.Item>


          <Form.Item
            name='lastName'
            label="Last Name"
            rules={[{ required: true, message: 'Please input your Last Name!' }]}
          >
            <Input placeholder='i.e. Smith' />
          </Form.Item>


          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type='primary'
                htmlType='submit'
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Add Person
              </Button>
            )}
          </Form.Item>
        </Form>
      )}
    
export default AddPerson