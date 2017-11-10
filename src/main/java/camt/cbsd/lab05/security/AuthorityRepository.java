package camt.cbsd.lab05.security;

import camt.cbsd.lab05.entity.security.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority,Long> {
}
