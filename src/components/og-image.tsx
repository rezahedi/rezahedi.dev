export default function OGImage(params: {title: string, date: string, author: string}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        backgroundColor: '#100818',
        color:'#eee',
        backgroundImage: 'radial-gradient(circle at 25px 25px, #2a183c 2%, transparent 0%), radial-gradient(circle at 75px 75px, #2a183c 2%, transparent 0%)',
        backgroundSize: '100px 100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          height:'100%',
          boxSizing:'border-box',
          flexDirection: 'column',
          justifyContent: 'center',
          padding:'40px 80px 100px 80px',
        }}
      >
        <h1 style={{
          fontFamily: 'Mona-Sans-Bold',
          fontSize: '3.5rem',
          textWrap:'balance',
          color: '#da3654'
        }}>
          {params.title}
        </h1>
        <p style={{
          flexGrow:'1',
          fontFamily: 'Mona-Sans-Regular',
          fontSize:'1.8rem',
          fontWeight: '100',
          color:'#8e8a91'
        }}>
          {params.date}
        </p>
        <div style={{
          display: 'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <b style={{
            fontFamily: 'Mona-Sans-Regular',
            fontSize:'2.2rem',
            color:'#eee'
          }}>
            {params.author}
          </b>
          <img
            src="https://rezahedi.dev/shark.svg"
            style={{
              width:'80px',
              height:'80px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
