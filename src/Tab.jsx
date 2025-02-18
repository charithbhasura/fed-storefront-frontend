function Tab(props) { 

    const handleClick = () => {
        props.onTabClick(props._id);
    }

    if(props._id === props.selectedCategoryId){
        return(
        <button onClick={handleClick} className="border bg-[#edeef1] px-2 py-1 rounded-md">
            {props.name}
        </button>
        )
    }

  return (
    <button onClick={handleClick} className="border border-[#edeef1] px-2 py-1 rounded-md">
        {props.name}
    </button>
  )
}

export default Tab