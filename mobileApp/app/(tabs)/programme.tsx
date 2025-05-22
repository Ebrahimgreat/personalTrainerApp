
import{StyleSheet,View,Text,Button} from 'react-native'
function Programme()
{
    return(<View style={styles.container}>
        <Text>
         Programmes

        </Text>
        <Text>
            Programmes
        </Text>
        <Button onPress={()=>alert('hello world')} title="Create Programme">
     
        </Button>


    </View>)
}
const styles=StyleSheet.create({
    container:{
  
    }
})
export default Programme;