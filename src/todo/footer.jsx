import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'Grancis'
        }
    },
    render() {
        return(
            <div id="footer">
                <span>Refer to Jokcy</span>
                <br></br>
                <span>Author:{this.author}</span>
            </div>
        )
    }
}