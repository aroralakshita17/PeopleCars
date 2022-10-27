const getStyles = () => ({
    title: {
      fontSize: 50,
      padding: '15px',
      marginBottom: '50px'
    }
  })
  
  const Title = () => {
    const styles = getStyles()
  
    return <h2 style={styles.title}> PEOPLE AND THEIR CARS</h2>
  }
  
  export default Title