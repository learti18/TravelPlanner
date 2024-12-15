using AutoMapper;
using TravelPlanner.Server.Dtos;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateDestinationDto, Destination>()
                .ForMember(d => d.ImageUrl, opt => opt.Ignore());
            CreateMap<Destination, DestinationDto>();
            
            CreateMap<Hotel, HotelDto>();
            CreateMap<CreateHotelDto, Hotel>()
                .ForMember(h => h.ImageUrl, opt => opt.Ignore());

            CreateMap<Activity, ActivityDto>();
            CreateMap<CreateActivityDto, Activity>()
                .ForMember(a => a.ImageUrl, opt => opt.Ignore());
        }
    }
}
