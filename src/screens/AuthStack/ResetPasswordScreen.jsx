import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { emailValidator } from '../../helpers/emailValidator'
import { resetPassword } from '../../helpers/auth'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("You will receive email with password reset link.")

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    } else {
      setLoading(true)
      resetPassword(email.value).then((val) => {
        console.log("Val: " + val)
        if (val == "Success") {
          setDescription("Email sent!")
        } else if (val === "auth/user-not-found") {
          setEmail({ ...email, error: "Not a valid registered email!" })
          setDescription("You will receive email with password reset link.")
        } else if (val === "auth/invalid-email") {
          setEmail({ ...email, error: "Ooops! We need a valid email address." })
          setDescription("You will receive email with password reset link.")
        }  
        
        else {
          console.log("Unaccounted-for error: " + val)
          setEmail({ ...email, error: "Internal error. Please try again later." })
          setDescription("You will receive email with password reset link.")
        }
        setLoading(false)
      })
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description={description}
      />
      <Button
        mode="contained"
        loading={loading}
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
