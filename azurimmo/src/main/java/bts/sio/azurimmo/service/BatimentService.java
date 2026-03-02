package bts.sio.azurimmo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bts.sio.azurimmo.model.Batiment;
import bts.sio.azurimmo.model.dto.BatimentDTO;
import bts.sio.azurimmo.repository.BatimentRepository;
import bts.sio.azurimmo.model.mapper.BatimentMapper;

@Service
public class BatimentService {

    @Autowired
    private BatimentRepository batimentRepository;

    public Optional<BatimentDTO> getBatimentDTO(Long id) {
    	return batimentRepository.findById(id)
                .map(BatimentMapper::toDTO);
}
    public List<BatimentDTO> getBatimentsDTO() {
        return batimentRepository.findAll()
                                 .stream()
                                 .map(BatimentMapper::toDTO)
                                 .collect(Collectors.toList());
}
    public BatimentDTO saveBatimentDTO(BatimentDTO dto) {
        Batiment entity = BatimentMapper.toEntity(dto);
        Batiment saved = batimentRepository.save(entity);
        return BatimentMapper.toDTO(saved);
    }
}




